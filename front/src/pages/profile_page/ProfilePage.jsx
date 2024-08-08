import { jwtDecode } from "jwt-decode";
function ProfilePage() {
  const token = jwtDecode(window.localStorage.getItem('token'))
    console.log(token);
    return (

    <div className="container border mx-auto mt-5 p-4 rounded">
        <ul className="flex justify-around">
            <li>Profile</li>
            <li>My registrations</li>
            {token.role === 'admin' && <li>Add tour</li>}
        </ul>
    </div>
  );
}

export default ProfilePage;
