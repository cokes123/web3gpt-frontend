import axios from 'axios';
const base2_url = "https://api.lazibit.ai/v1";


export const registerReq = async (data: any) => {
  try {
    const response = await axios.post(base2_url + '/register', data);
    return response;
  } catch (error) {
    console.error('注册接口出错:', error);
    throw error;
  }
};