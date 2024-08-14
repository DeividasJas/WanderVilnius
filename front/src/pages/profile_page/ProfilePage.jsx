import { jwtDecode } from "jwt-decode";
import TourForm from "../../components/TourForm";
import TourTime from "../../components/TourTime";

function ProfilePage() {
  const token = jwtDecode(window.localStorage.getItem('token'))
    console.log(token);
    return (

    <div className=" max-w-xl  border mx-auto mt-5 rounded">
        <ul className="flex my-4 justify-around">
            <li>Profile</li>
            <li>My registrations</li>
            {token.role === 'admin' && <li>Add tour</li>}
            {token.role === 'admin' && <li>Add tour time</li>}
        </ul>
        <TourForm/>

        <TourTime/>
    </div>
  );
}

export default ProfilePage;
