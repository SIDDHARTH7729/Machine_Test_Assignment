// This is a controller file and  handles the business logic for file uploads, parsing, and data distribution among agents.
// It includes functions to parse the uploaded file, upload and distribute data, and fetch all distributed data.

const xlsx = require('xlsx');
const {File,Agent} = require('../models');
const { v4: uuidv4 } = require('uuid');

// this func parses the uploaded file buffer and returns the data
// it normalizes the data, cleans up phone numbers, and checks for required fields
// here assumption has been made that the file contains columns: FirstName, Phone, and Notes 
/* ***** as well as the format of phone is starting with + , anything before it is removed , since phone numbers of diff contries are of diff length
         we have kept it min  lnegth of  7 (as shortest is 7 world wide)***** */
// if the data is invalid, it throws an error
const parseFileBuffer = (req) => {
  if (!req.file) throw new Error("No file uploaded");

  // Read the file buffer and parse it using xlsx library
  const fileBuffer = xlsx.read(req.file.buffer, { type: "buffer" });
  const sheet = fileBuffer.Sheets[fileBuffer.SheetNames[0]];
  const rawData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

  const cleanedData = rawData.map((row) => {
    const cleanedRow = {};
    // here we normalise field to lowercase and trim spaces
    Object.entries(row).forEach(([key, value]) => {
      const normalizedKey = key.trim().toLowerCase();
      let cleanedValue = typeof value === "string" ? value.trim() : value;

      if (normalizedKey === "phone") {
        // here we normalize or clean up numbers
        cleanedValue = cleanedValue
          .toString()
          .replace(/^[^+\d]*/, "")   // Remove leading junk
          .replace(/[^\d+]/g, "");   // Keeping only digits and numbers after plus sign

        if (!cleanedValue.startsWith("+")) {
          cleanedValue = `+91${cleanedValue.replace(/^(\+?91)?/, "")}`;
        }

        cleanedRow["Phone"] = cleanedValue;
      } else if (normalizedKey === "firstname") {
        cleanedRow["FirstName"] = cleanedValue;
      } else if (normalizedKey === "notes") {
        cleanedRow["Notes"] = cleanedValue;
      }
    });
    return cleanedRow;
  });

  // Validate cleaned data before returning
  const isInvalid = cleanedData.some(
    (row) => !row.FirstName || !row.Phone || !row.Notes
  );

  if (isInvalid)
    throw new Error("Invalid file format. Required fields: FirstName, Phone, Notes");

  console.log("File parsed and cleaned successfully");
  return cleanedData;
};

// this function handles the file upload and returns the parsed data
const uploadFile = async (req) => {
    return parseFileBuffer(req);
};

// This function handles the file upload, parses the data, and distributes it among agents
// It checks if there are at least 5 agents available to distribute the data
// If successful, it saves the distributed data to the database and returns a success message
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
            agentName: agents[index%agents.length].name,
            agentEmail: agents[index%agents.length].email,
            createdAt: entry.createdAt || new Date(), // if we want to sort by createdAt later
        }))

        // Save the distributed data to the database
        await File.insertMany(distributedData);

        return res.status(200).json({ success:true,message: "Data uploaded and distributed successfully", data: distributedData });

    } catch (error) {
       // Handle errors during file upload and distribution
        console.error("Error uploading and distributing data:", error.message);
        return res.status(500).json({ success:false,message: "Internal server error while uploading and distributing data" });
    }
}

// This function fetches all the data from the File model and populates the agentId field with agent details
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