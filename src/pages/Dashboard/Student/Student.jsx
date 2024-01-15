import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";

const Student = () => {
  const { user } = useContext(AuthContext);
  // const [userInfo, SetUserInfo] = useState();

  // useEffect(() => {
  //   fetch(`http://localhost:3000/userInfo/${user?.email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       SetUserInfo(data.userInfo);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user role:", error);
  //     });
  // }, [user?.email]);

  return (
    <div className="text-black">
      <div className="h2">{user?.displayName}</div>
    </div>
  );
};

export default Student;
