function Students(data) {
  const studentData = data.data;
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
