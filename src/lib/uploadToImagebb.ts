import axios from 'axios'

const IMAGE_HOSTING_API = `${process.env.IMAGE_HOSTING_API_URL}`

const uploadToImagebb = async (image: File | Blob): Promise<string> => {
  const formData = new FormData()
  formData.append('image', image)

  const res = await axios.post<{ data: { display_url: string } }>(IMAGE_HOSTING_API, formData, {
    headers: { 'content-type': 'multipart/form-data' },
  })

  return res.data.data.display_url
}

export default uploadToImagebb
