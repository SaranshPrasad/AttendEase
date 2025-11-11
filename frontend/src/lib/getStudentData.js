import axios from "axios";
export const getStudents = async () =>{
    const role = localStorage.getItem("role");
    try {
        if(role != 'admin'){
        throw new Error("User is not authorised admin");
    }else{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/view/students`, {withCredentials:true});
        if(res){
            return res?.data.studentData;
        }
    }
    } catch (error) {
        alert("Something went wrong : "+error.message);
    }

}