const fs = require("fs")
const { PinataSDK } = require("pinata-web3")

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "olive-objective-sheep-319.mypinata.cloud",
})

async function uploadFileToPinata(path: string) {
  try {
    const buffer = fs.readFileSync(path)
    const blob = new globalThis.Blob([buffer], { type: "application/json" })

    const upload = await pinata.upload.file(blob, {
      fileName: path.split("/").pop(),
    })

    console.log("Upload successful:", upload)
    return {
      ipfsHash: upload.IpfsHash,
      url: `https://gateway.pinata.cloud/ipfs/${upload.IpfsHash}`,
    }
  } catch (error) {
    console.error("Error uploading to Pinata:", error)
    throw error
  }
}

// Upload JSON data
async function uploadJSONToPinata(jsonData: object, fileName?: string) {
  try {
    const upload = await pinata.upload.json(jsonData, {
      metadata: {
        name: fileName || "data.json",
      },
    });
    return {
      ipfsHash: upload.IpfsHash,
      url: `https://gateway.pinata.cloud/ipfs/${upload.IpfsHash}`
    };
  } catch (error) {
    console.error("Error uploading JSON to Pinata:", error);
    throw error;
  }
}

// // Upload from Buffer
// export async function uploadBufferToPinata(buffer: Buffer, fileName: string) {
//   try {
//     const file = new File([buffer], fileName);
//     const upload = await pinata.upload.file(file);
//     return {
//       ipfsHash: upload.IpfsHash,
//       url: `https://gateway.pinata.cloud/ipfs/${upload.IpfsHash}`
//     };
//   } catch (error) {
//     console.error("Error uploading buffer to Pinata:", error);
//     throw error;
//   }
// }

// Export functions
module.exports = {
  uploadFileToPinata,
  uploadJSONToPinata,
};

// Run only if executed directly
// if (require.main === module) {
//   (async () => {
//     const mythril = await uploadFileToPinata("mythril_report.json")
//     const slither = await uploadFileToPinata("slither_report.json")
//     const ipfsHash = {
//       mythril: mythril.ipfsHash,
//       slither: slither.ipfsHash,
//     }
//   })
// }