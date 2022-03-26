import axios, {AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosStatic} from 'axios';
import { ElLoading } from 'element-plus'

let loading: any;

const startLoading = () => {

  interface Options {
    lock: boolean;
    text: string;
    background: string;
  };

  const options: Options = {
    lock: true,
    text: "加载中...",
    background: 'rgba(0,0,0,0.7)'
  }
  loading = ElLoading.service(options);
}

const endLoading = () => {
  loading.close();
}

class AxiosUtilt{
    public requests: AxiosInstance;
    
    constructor(axios: AxiosStatic){
      this.requests = axios.create({
        timeout: 1000,
        headers: {'Content-Type': 'application/json'},
      })
    }
    
    /**
     * 获取请求拦截器
     * @param requests 
     */
    requestInterceptors(requests: AxiosInstance) {
      this.requests.interceptors.request.use(
        (config: AxiosRequestConfig)=>{
          //加载
          startLoading()
          console.log('我是拦截器,请求发送成功');
          return config
        })
      }
    
    /**
     * 获取响应拦截器
     * @param requests 
     */
    responseInterceptors(requests: AxiosInstance){
      requests.interceptors.response.use(
        (response: AxiosResponse)=>{
          // 结束
          endLoading();
          console.log('我是拦截器,获取响应成功');

          return response
        },
        (error: any)=>{
          endLoading();
          return Promise.reject(new Error('file'))
        }
      )
    }
    /**
     * 
     * @returns 获取axios实例对象
     */
    getRequest(){
      this.requestInterceptors(this.requests)
      this.responseInterceptors(this.requests)
      return this.requests
  }
}

/**
 * 暴露axios
 */
export default new AxiosUtilt(axios).getRequest() 