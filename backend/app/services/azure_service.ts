import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'
import env from '#start/env'

export const AZURE_ACCOUNT_NAME = env.get('AZURE_ACCOUNT_NAME')
export const AZURE_ACCOUNT_KEY = env.get('AZURE_ACCOUNT_KEY')
export const AZURE_CONTAINER_NFT = env.get('AZURE_CONTAINER_NFT')
export const AZURE_CONTAINER_PROFIL_IMAGE = env.get('AZURE_CONTAINER_PROFIL_IMAGE')
export async function deleteImage(
  imageUrl: string,
  accountName: string,
  accountKey: string,
  containerName: string
): Promise<void> {
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  )

  const containerClient = blobServiceClient.getContainerClient(containerName)

  try {
    const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
    const blobClient = containerClient.getBlobClient(imageName)
    const blobExists = await blobClient.exists()

    if (blobExists) {
      await blobClient.delete()
    }
  } catch (error) {
    throw new Error('Failed to delete image from Azure Storage')
  }
}

export async function uploadBase64ImageToAzureStorage(
  base64Image: string,
  imageName: string,
  accountName: string,
  accountKey: string,
  containerName: string
): Promise<string> {
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  )

  const containerClient = blobServiceClient.getContainerClient(containerName)

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '')
  const buffer = Buffer.from(base64Data, 'base64')

  try {
    const blockBlobClient = containerClient.getBlockBlobClient(imageName)
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: 'image/jpeg',
      },
    })
    return `https://${accountName}.blob.core.windows.net/${containerName}/${imageName}`
  } catch (error) {
    throw new Error('Failed to upload image to Azure Storage')
  }
}

export function generateRandomImageName(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < 15; i++) {
    result += characters.charAt(Math.floor(Math.random() * 10))
  }
  return result + '.jpg'
}
