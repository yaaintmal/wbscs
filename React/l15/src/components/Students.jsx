function Students() {
  const studentData = {
    id: 1,
    firstName: "Testy",
    lastName: "McTest",
    age: 42,
    course: "Web Development",
    city: "Berlin",
    picture: "https://randomuser.me/api/portraits/men/1.jpg",
  };
  return (
    <article>
      <div className="image">
        <img
          src={studentData.picture}
          alt={`student-${studentData.id}`}
          className="avatar"
        />
      </div>
      <div>
        <h2>
          {studentData.firstName} {studentData.lastName}
        </h2>
        <p>Age: {studentData.age}</p>
        <p>Course: {studentData.course}</p>
        <p className="city">{studentData.city}</p>
      </div>
    </article>
  );
}

export default Students;
