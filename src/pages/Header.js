/** @format */

// import React, { useState } from "react";

// // import { Button, Menu, MenuItem, Tooltip } from "@mui/material";

// import { Link } from "react-router-dom";

// import { FiLogOut } from "react-icons/fi";

// import { BiDownArrow } from "react-icons/bi";

// import { AiFillCaretDown } from "react-icons/ai";

// import { CgProfile } from "react-icons/cg";

// function Header({ user }) {
//   let getUser = () => {
//     if (localStorage.getItem("LazerUser")) {
//       let data = JSON.parse(localStorage.getItem("LazerUser"));

//       if (data) {
//         return data.data;
//       }

//       return "";
//     }
//   };

//   let logout = () => {
//     localStorage.removeItem("LazerUser");

//     window.location.replace("/");
//   };

//   const [anchorEl, setAnchorEl] = useState(null);

//   const userDropDown = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <nav className="header">
//         <div style={{ marginLeft: "10px" }}>
//           <h4 style={{ fontSize: "16px", fontWeight: "600" }}>Magod ERP</h4>
//         </div>

//         <div
//           style={{ marginRight: "30px", fontSize: "12px", fontWeight: "600" }}
//         >
//           {getUser() !== undefined ? (
//             <>
//               <>{console.log(getUser())}</>

//               <>
//                 {getUser()[0]["Name"]} - {getUser()[0]["UnitName"]} |{" "}
//               </>

//               <button
//                 style={{
//                   backgroundColor: "transparent",

//                   border: "none",

//                   color: "black",
//                   fontSize: "12px",
//                   fontWeight: "600",
//                 }}
//                 onClick={logout}
//               >
//                 Sign Out
//               </button>
//             </>
//           ) : (
//             ""
//           )}
//         </div>
//       </nav>

//       <div style={{ height: "10px" }}>&nbsp;</div>
//     </>
//   );
// }

// export default Header;

/** @format */

// /** @format */

// import React, { useState } from "react";

// // import { Button, Menu, MenuItem, Tooltip } from "@mui/material";

// import { Link } from "react-router-dom";

// import { FiLogOut } from "react-icons/fi";

// import { BiDownArrow } from "react-icons/bi";

// import { AiFillCaretDown } from "react-icons/ai";

// import { CgProfile } from "react-icons/cg";

// function Header({ user }) {
// 	let getUser = () => {
// 		if (localStorage.getItem("LazerUser")) {
// 			let data = JSON.parse(localStorage.getItem("LazerUser"));
// 			console.log("data", data);

// 			if (data) {
// 				return data.data;
// 			}

// 			return "";
// 		}
// 	};

// 	let logout = () => {
// 		localStorage.removeItem("LazerUser");

// 		window.location.replace("http://172.16.20.61:3000/");
// 	};

// 	const [anchorEl, setAnchorEl] = useState(null);

// 	const userDropDown = Boolean(anchorEl);

// 	const handleClick = (event) => {
// 		setAnchorEl(event.currentTarget);
// 	};

// 	const handleClose = () => {
// 		setAnchorEl(null);
// 	};

// 	return (
// 		<>
// 			<nav className="header">
// 				<div style={{ marginLeft: "10px" }}>
// 					<h4 style={{ fontSize: "16px", fontWeight: "600" }}>Magod ERP</h4>
// 				</div>

// 				<div
// 					style={{ marginRight: "30px", fontSize: "12px", fontWeight: "600" }}>
// 					{getUser() !== undefined ? (
// 						<>
// 							<>{console.log(getUser())}</>

// 							<>
// 								{getUser()[0]["Name"]} - {getUser()[0]["UnitName"]} |{" "}
// 							</>

// 							<button
// 								style={{
// 									backgroundColor: "transparent",

// 									border: "none",

// 									color: "black",
// 									fontSize: "12px",
// 									fontWeight: "600",
// 								}}
// 								onClick={logout}>
// 								Sign Out
// 							</button>
// 						</>
// 					) : (
// 						""
// 					)}
// 				</div>
// 			</nav>

// 			<div style={{ height: "10px" }}>&nbsp;</div>
// 		</>
// 	);
// }

// export default Header;
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BiDownArrow } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import { CgLogIn, CgProfile } from "react-icons/cg";

function Header() {
	// Function to get user data from cookies
	const getUser = () => {
		// const cookieData = Cookies.get("LazerUser");
		const cookieData = JSON.parse(Cookies.get("userData"));
		console.log("cookieData:", cookieData.Name);
		if (cookieData) {
			const data = cookieData;
			console.log("data", data);
			return data.data;
		}
		return null;
	};
	const userData = JSON.parse(Cookies.get("userData"));
	console.log("User Data:", userData.Name);
	// Function to handle logout
	const logout = () => {
		Cookies.remove("userData");
		window.location.replace("http://172.16.20.61:3000/");
		// window.location.replace("http://192.168.1.25:9000/");
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const userDropDown = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	console.log("userData?.Name", userData?.Name);
	return (
		<>
			<nav className="header">
				<div style={{ marginLeft: "10px" }}>
					<h4 style={{ fontSize: "16px", fontWeight: "600" }}>Magod ERP</h4>
				</div>

				<div
					style={{ marginRight: "30px", fontSize: "12px", fontWeight: "600" }}>
					{/* {getUser() ? (
						<>
							{userData?.Name} - {getUser()[0]["UnitName"]} |{" "}
							<button
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "black",
									fontSize: "12px",
									fontWeight: "600",
								}}
								onClick={logout}>
								Sign Out
							</button>
						</>
					) : (
						""
					)} */}
					{userData.Name} - {userData.UnitName} | {""}
					<button
						style={{
							backgroundColor: "transparent",
							border: "none",
							color: "black",
							fontSize: "12px",
							fontWeight: "600",
						}}
						onClick={logout}>
						Sign Out
					</button>
				</div>
			</nav>

			<div style={{ height: "10px" }}>&nbsp;</div>
		</>
	);
}

export default Header;
// import React, { useState } from "react";
// import Cookies from "js-cookie";
// import { Link } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
// import { BiDownArrow } from "react-icons/bi";
// import { AiFillCaretDown } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg";

// function Header() {
// 	const [name, setName] = useState();
// 	// Function to get user data from cookies
// 	const getUser = () => {
// 		const cookieData = Cookies.get("userData");
// 		if (cookieData) {
// 			try {
// 				const data = JSON.parse(cookieData);
// 				console.log("Parsed data:", data.Name);
// 				setName(data.Name);
// 				return data.data; // Adjust if data structure differs
// 			} catch (error) {
// 				console.error("Error parsing cookie data:", error);
// 			}
// 		}
// 		return null;
// 	};

// 	// Get user data from cookie
// 	const userData = getUser();
// 	console.log("User Data:", userData);

// 	// Function to handle logout
// 	const logout = () => {
// 		Cookies.remove("userData");
// 		window.location.replace("http://172.16.20.61:3000/");
// 	};

// 	const [anchorEl, setAnchorEl] = useState(null);
// 	const userDropDown = Boolean(anchorEl);

// 	const handleClick = (event) => {
// 		setAnchorEl(event.currentTarget);
// 	};

// 	const handleClose = () => {
// 		setAnchorEl(null);
// 	};
// 	// console.log("userData[0]?.Name", userData.Name);
// 	return (
// 		<>
// 			<nav className="header">
// 				<div style={{ marginLeft: "10px" }}>
// 					<h4 style={{ fontSize: "16px", fontWeight: "600" }}>Magod ERP</h4>
// 				</div>

// 				<div
// 					style={{ marginRight: "30px", fontSize: "12px", fontWeight: "600" }}>
// 					{userData ? (
// 						<>
// 							{console.log(userData)}
// 							{userData[0]?.Name} - {userData[0]?.UnitName} |{" "}
// 							<button
// 								style={{
// 									backgroundColor: "transparent",
// 									border: "none",
// 									color: "black",
// 									fontSize: "12px",
// 									fontWeight: "600",
// 								}}
// 								onClick={logout}>
// 								Sign Out
// 							</button>
// 						</>
// 					) : (
// 						""
// 					)}
// 				</div>
// 			</nav>

// 			<div style={{ height: "10px" }}>&nbsp;</div>
// 		</>
// 	);
// }

// export default Header;
