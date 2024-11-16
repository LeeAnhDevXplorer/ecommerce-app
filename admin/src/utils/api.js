import axios from 'axios';
// import 'dotenv/config';

const BASE_URL = new URL('http://localhost:4000/');

export const fetchDataFromApi = async (url) => {
  const { data } = await axios.get(new URL(url, BASE_URL));
  return data;
};

export const postData = async (url, formData) => {
  const { data } = await axios.post(new URL(url, BASE_URL), formData);
  return data;
};


// Hàm để cập nhật dữ liệu
export const editData = async (url, updateData) => {
  // Hàm để cập nhật dữ liệu
  const { data } = await axios.put(new URL(url, BASE_URL), updateData); // Gửi yêu cầu PUT đến URL kết hợp với BASE_URL và dữ liệu từ form
  return data; // Trả về dữ liệu nhận được
};

export const deleteData = async (url) => {
  const { data } = await axios.delete(new URL(url, BASE_URL)); // Không cần id ở đây
  return data; // Trả về dữ liệu sau khi xóa
};
