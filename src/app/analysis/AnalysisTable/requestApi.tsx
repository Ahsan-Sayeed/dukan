import { url } from "@/config/backendConfig";
import axios from "axios";

export const getAllData = async(src:string) => axios.get(`${url}stock?name=${src}`);