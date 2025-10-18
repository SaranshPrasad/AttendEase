import axios from "axios";
export const getCourses = async () =>{
    const role = localStorage.getItem("role");
    try {
        if(role != 'admin'){
        throw new Error("User is not authorised admin");
    }else{
        const res = await axios.get('http://localhost:5001/admin/view/courses', {withCredentials:true});
        if(res){
            // console.log(res.data);
            return res?.data.courses;
        }
    }
    } catch (error) {
        alert("Something went wrong : "+error.message);
    }

}