import axios from "axios";
import React, { useEffect, useState } from "react";

function Admin_main() {
  const [adminUser, setAdminUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/");
  }, []);

  return <div>관리자 메인</div>;
}

export default Admin_main;
