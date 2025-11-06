import axios from "axios";
export const getFaculty = async () =>{
    const role = localStorage.getItem("role");
    try {
        if(role != 'admin'){
        throw new Error("User is not authorised admin");
    }else{
        const res = await axios.get('http://localhost:5001/admin/view/faculty', {withCredentials:true});
        if(res){
            return res?.data.facultyData;
        }
    }
    } catch (error) {
        alert("Something went wrong : "+error.message);
    }

}