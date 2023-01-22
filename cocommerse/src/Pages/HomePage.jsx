import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LandingPageCard from "../Components/LandingPageCard";

import "./HomePage.css";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./HomePage.css";


const HomePage = () => {
	const [data, setData] = useState([]);
	const [limit, setLimit] = useState(9);

	const getData = () => {
		axios
			.get(`https://unit-5backend.onrender.com/LandingMen?_limit=${limit}`)
			.then((res) => {
				setData(res.data);
				console.log(res.data);
			});
	};
	const handleLimit=()=>{
		if(limit>50){
			setLimit(9);
		}
		else{
			setLimit((prev)=>prev+3)
		}
	}
	useEffect(() => {
		getData();
	}, [limit]);
	return (
		<div>
			<div id="navbar">
				<Navbar/>
			</div>
		<div>
	
			<div className="product_container">
				{data?.map((el) => {
					return (
						<div className="cards">
						<LandingPageCard
							designer={el.designer}
							followers={el.followers}
							id={el.id}
							image={el.image}
							likes={el.likes}
						/>
						</div>
					);
				})}
			</div>
			<button className="homebtn" onClick={handleLimit}>Load More</button>
		</div>
		</div>
	);
};

export default HomePage;