import Cookies from "universal-cookie";
import axios from "axios";
import API from './axios';

export default function useGetBlogList(): Function {


    return (): Promise<any> => {
        return API.get('post')
            .then(response => {
                    console.log(response);
                    return response.data.value
                }
            );

    }

}