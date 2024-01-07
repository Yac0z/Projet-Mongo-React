import axios, { all } from "axios";
import { useEffect, useState } from "react";

function Student() {
	//Logic

	const [studentid, setId] = useState("");
	const [studentname, setName] = useState("");
	const [studentaddress, setAddress] = useState("");
	const [mobile, setMobile] = useState("");
	const [students, setUsers] = useState([]);

	useEffect(() => {
		(async () => await Load())();
	}, []);

	async function Load() {
		const result = await axios.get(
			"https://localhost:9000/api/v1/student/getall"
		);
		setUsers(result.data);
		console.log(result.data);
	}

	async function save(event) {
		event.preventDefault();
		try {
			await axios.post("https://localhost:9000/api/v1/student/save", {
				studentname: studentname,
				studentaddress: studentaddress,
				mobile: mobile,
			});
			alert("Student Registation Successfully");
			setId("");
			setName("");
			setAddress("");
			setMobile("");
			Load();
		} catch (err) {
			alert("User Registation Failed");
		}
	}

	async function editStudent(students) {
		setName(students.studentname);
		setAddress(students.studentaddress);
		setMobile(students.mobile);
		setId(students._id);
	}

	async function DeleteStudent(studentid) {
		await axios.delete(
			"https://localhost:9000/api/v1/student/delete/" + studentid
		);
		alert("Student deleted Successfully");
		Load();
	}

	async function update(event) {
		event.preventDefault();
		if (
			[studentname, studentaddress, mobile].some((element) => {
				element.trim() === "";
			})
		) {
			alert("Veriffier les champs");
			return;
		}
		try {
			await axios.put(
				"https://localhost:9000/api/v1/student/edit/" + studentid,
				{
					studentname: studentname,
					studentaddress: studentaddress,
					mobile: mobile,
				}
			);
			alert("Registation Updateddddd");

			<div class="alert alert-success" role="alert">
				Student Updateddd Failed
			</div>;
			setId("");
			setName("");
			setAddress("");
			setMobile("");
			Load();
		} catch (err) {
			<div class="alert alert-danger" role="alert">
				Student Updateddd Failed
			</div>;
			alert("Student Updateddd Failed");
		}
	}

	//Design

	return (
		<div className="dep container-md ">
			<h1>Student Details</h1>
			<hr className="text-white" />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div className="container-md mx-4 d-flex justify-content-center p-6 sec1">
				<form className="col col-6">
					<div className="form-group ">
						<label>Student Name</label>
						<input
							required="true"
							type="text"
							className="form-control opacity-25 fw-bold "
							id="studentname"
							value={studentname}
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>
					</div>

					<div className="form-group">
						<label>Student Address</label>
						<input
							type="text"
							className="form-control opacity-25 fw-bold "
							id="studentaddress"
							value={studentaddress}
							onChange={(event) => {
								setAddress(event.target.value);
							}}
						/>
					</div>

					<div className="form-group">
						<label>Mobile</label>
						<input
							type="number"
							className="form-control opacity-25 fw-bold "
							id="mobile"
							value={mobile}
							onChange={(event) => {
								setMobile(event.target.value);
							}}
						/>
					</div>
					<div className="d-flex flex-row-reverse">
						{!studentid && (
							<button
								className="btn btn-success mt-4"
								onClick={save}
							>
								Register
							</button>
						)}

						{studentid && (
							<button
								className="btn btn-info mt-4 mx-2"
								onClick={update}
							>
								Update
							</button>
						)}
					</div>
				</form>
			</div>
			<br />
			<div className="sec2">
				<h1>Students List</h1>
				<hr className="text-white" />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<table
					className="table  table-striped rounded-4 text-white"
					align="center"
				>
					<thead>
						<tr>
							<th scope="col">Student Name</th>
							<th scope="col">Student Address</th>
							<th scope="col">Student Mobile</th>
							<th scope="col">Option</th>
						</tr>
					</thead>
					{students.map(function fn(student) {
						return (
							<tbody>
								<tr className="m-2">
									<td className="text-white">
										{student.studentname}
									</td>
									<td className="text-white">
										{student.studentaddress}
									</td>
									<td className="text-white">
										{student.mobile}
									</td>
									<td>
										<button
											type="button"
											className="btn btn-secondary mx-2 px-3 "
											onClick={() => editStudent(student)}
										>
											Edit
										</button>
										<button
											type="button"
											className="btn btn-danger "
											onClick={() =>
												DeleteStudent(student._id)
											}
										>
											Delete
										</button>
									</td>
								</tr>
							</tbody>
						);
					})}
				</table>
			</div>
		</div>
	);
}

export default Student;
