function Students(props) {
  // importing data from ../data/students.js as const students
  // edit / imported in mainApp as it's passed as prob while invoking component
  const students = props.data;

  return (
    <>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </>
  );
}

export default Students;
