const xlsx = require('xlsx');
const {File,Agent} = require('../models');
const { v4: uuidv4 } = require('uuid');

// this func parses the uploaded file buffer and returns the data
const parseFileBuffer = (req) => {
  if (!req.file) throw new Error("No file uploaded");

  const fileBuffer = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheet = fileBuffer.Sheets[fileBuffer.SheetNames[0]];
  const rawData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

  const cleanedData = rawData.map((row) => {
    const cleanedRow = {};

    // Normalize keys to lowercase and trim values
    Object.entries(row).forEach(([key, value]) => {
      const normalizedKey = key.trim().toLowerCase();
      let cleanedValue = typeof value === "string" ? value.trim() : value;

      if (normalizedKey === "phone") {
        // Remove any non-digit characters, but keep + if present at start
        cleanedValue = cleanedValue
          .replace(/^[^+\d]*/, "")   // Remove leading non-digit, non-plus chars
          .replace(/[^\d+]/g, "");   // Remove anything that's not digit or '+'
        
        if (!cleanedValue.startsWith("+91")) {
          cleanedValue = `+91${cleanedValue.replace(/^\+?91/, "")}`;
        }
      }

      cleanedRow[normalizedKey] = cleanedValue;
    });

    return cleanedRow;
  });

  // Validate required fields
  const isInvalid = cleanedData.some(row => !row.firstname || !row.phone || !row.notes);
  if (isInvalid) throw new Error("Invalid file format. Required fields: firstname, phone, notes");

  console.log("File parsed and cleaned successfully");
  return cleanedData;
};

// this function handles the file upload and returns the parsed data
const uploadFile = async (req) => {
    return parseFileBuffer(req);
};

const uploadAndDistributeData = async (req, res) => {
    try {
        // check if the file is uploaded or not
        const data = parseFileBuffer(req);

        // fetch agents
        const agents = await Agent.find({}).select("-password");

        // check if minimum 5 agents are there or not
        if(agents.length<5){
            return res.status(400).json({ success:false,message: "Not enough agents to distribute the data" });
        }

        // random fileid generation
        const id = uuidv4();

        // Distribute data among every agents
        const distributedData = data.map((entry,index)=>({
            FirstName: entry.FirstName,
            Phone: String(entry.Phone),
            Notes: entry.Notes,
            agentId: agents[index%agents.length]._id,
            sameId: id,
        }))

        // Save the distributed data to the database
        await File.insertMany(distributedData);

        return res.status(200).json({ success:true,message: "Data uploaded and distributed successfully", data: distributedData });

    } catch (error) {
        console.error("Error uploading and distributing data:", error.message);
        return res.status(500).json({ success:false,message: "Internal server error while uploading and distributing data" });
    }
}

const fetchAllData = async(req, res) => {
    try {
        // Fetch all data from the File model
        const allData = await File.find({}).populate('agentId', 'name email mobile').select('-__v');

        // Check if data is found
        if (!allData || allData.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

        // Return the fetched data
        return res.status(200).json({ message: "Data fetched successfully", data: allData });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return res.status(500).json({ message: "Internal server error while fetching data" });
    }
}

module.exports = {
    uploadFile,
    uploadAndDistributeData,
    fetchAllData
}