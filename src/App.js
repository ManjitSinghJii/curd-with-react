import { useState } from "react";
import 'remixicon/fonts/remixicon.css'
import './App.css'


const App = ()=> {

  const [editIndex, setEditIndex] = useState(null)
  const [right, setRight] = useState(-450)
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({
    fullname: '',
    class: '',
    roll: '',
    subject: '',
    dob: ''

  })

  const handleDrawer = ()=> {
    setRight(0)
  }

  const handleInput = (e)=> {
    const input = e.target
    const value = input.value
    const key = input.name
    setForm({
      ...form,
      [key]: value
    })
  }

  const createStudent = (e)=> {
    e.preventDefault()
    setStudents([
      ...students,
      form
    ])
    setForm({
      fullname: '',
      class: '',
      roll: '',
      subject: '',
      dob: ''
    })
    setRight(-450)
  }

  const deleteStudent = (index)=> {
    const backup = [...students]
    backup.splice(index, 1)
    setStudents(backup)
  }

  const editStudent = (index)=> {
    setRight(0)
    setForm(students[index])
    setEditIndex(index)
  }

  const saveStudent = (e)=> {
    e.preventDefault()
    const backup = [...students]
    backup[editIndex] = form
    setStudents(backup)
    setForm ({
      fullname: '',
      class: '',
      roll: '',
      subject: '',
      dob: ''
    })
    setEditIndex(null)
    setRight(-450)
  }


  const closeDrawer = ()=> {
    setRight(-450)
    setForm({
      fullname: '',
      class: '',
      roll: '',
      subject: '',
      dob: ''
    })
    setEditIndex(null)
  }
  return (
    <div style={{
      background: '#ddd',
      minHeight: '100vh',

    }}>
      <div style={{
        width: '70%',
        background: 'white',
        margin: '32px auto',
        padding: 32
      }}>
        <h1 style={{
          padding: 0,
          margin: 0,
          textAlign: 'center'
        }}>Welcome to CURD Application </h1>

        <button 
          onClick={handleDrawer}
          style={{
            border: 'none',
            background: '#4285f4',
            color: 'white',
            padding: '14px 24px',
            borderRadius: 5,
            fontSize: 16,
            margin: '24px 0'
        }}>
            <i className="ri-user-add-line" style={{marginRight: 8}}></i>
            New Student
          </button>

          <table className="crud-app">
            <thead>
              <tr>
                <th>S/No.</th>
                <th>Student`s Name</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Roll</th>
                <th>DOB</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                students.map((item, index)=>(
                  <tr>
                    <td>{index+1}</td>
                    <td>{item.fullname}</td>
                    <td>{item.subject}</td>
                    <td>{item.class}</td>
                    <td>{item.roll}</td>
                    <td>{item.dob}</td>
                    <td>
                  <div>
                    <button 
                      onClick={()=> editStudent(index)}
                      style={{
                        border: 'none',
                        width: 40,
                        height: 40,
                        background: '#07c65d',
                        color: 'white',
                        borderRadius: '50%',
                        fontWeight: 500,
                        fontSize: 20,
                        marginRight: 12
                      }}
                    >
                    <i className="ri-image-edit-line"></i>
                    </button>

                    <button 
                      onClick={()=>deleteStudent(index)}
                      style={{
                          border: 'none',
                          width: 40,
                          height: 40,
                          background: 'orange',
                          color: 'white',
                          borderRadius: '50%',
                          fontWeight: 500,
                          fontSize: 20
                      }}
                    >
                    <i className="ri-delete-bin-6-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
                ))
              }
            </tbody>

            {/* <tbody className="">
              <tr>
                <td>1</td>
                <td>Manjit Singh</td>
                <td>Maths</td>
                <td>5</td>
                <td>123</td>
                <td>10/05/2000</td>
                <td>
                  <div>
                    <button style={{
                      border: 'none',
                      width: 40,
                      height: 40,
                      background: '#07c65d',
                      color: 'white',
                      borderRadius: '50%',
                      fontWeight: 500,
                      fontSize: 20,
                      marginRight: 12
                    }}>
                    <i className="ri-image-edit-line"></i>
                    </button>

                    <button style={{
                      border: 'none',
                      width: 40,
                      height: 40,
                      background: 'orange',
                      color: 'white',
                      borderRadius: '50%',
                      fontWeight: 500,
                      fontSize: 20
                    }}>
                    <i className="ri-delete-bin-6-line"></i>
                    </button>
                  </div>
                </td>
              </tr>

            </tbody> */}
          </table>

      </div>

      <aside style={{
        position: 'fixed',
        top: 0,
        right: right,
        width: 450,
        background: 'white',
        height: '100%',
        boxShadow: '0 0 40px rgba(0,0,0,0.2)',
        padding: 32,
        boxSizing: 'border-box',
        transition: '0.5s'

      }}>
        <button 
          onClick={closeDrawer}
          style={{
            border: 'none',
            background: 'white',
            fontSize: 22,
            fontWeight: 500,
            color: 'red',
            position: 'absolute',
            top: 20,
            right: 20
          }}
        >
        <i className="ri-close-circle-line"></i>
        </button>
        <h1>New Student</h1>
        
        <form 
            onSubmit={editIndex === null ? createStudent : saveStudent}
            style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <input 
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5,

            }}
            onChange={handleInput}
            value={form.fullname}
              required
              name="fullname"
              type="text"
              placeholder="Enter Your Full Name here"
          />

          <input 
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5,

            }}
            onChange={handleInput}
              value={form.class}
              required
              name="class"
              type="number"
              placeholder="Enter Your Class"
          />

          <input 
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5,

            }}
            onChange={handleInput}
              value={form.roll}
              required
              name="roll"
              type="number"
              placeholder="Enter Your Roll"
          />

          <input 
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5,

            }}
            onChange={handleInput}
              value={form.subject}
              required
              name="subject"
              type="text"
              placeholder="Enter Your Subject here"
          />

          <input 
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5,

            }}
            onChange={handleInput}
              value={form.dob}
              required
              name="dob"
              type="date"
          />

          {
            editIndex == null ? 
            <button style={{
              border: 'none',
              background: '#4285f4',
              color: 'white',
              padding: '14px 24px',
              borderRadius: 5,
              fontSize: 16
  
            }}>SUBMIT</button>
            
            :
            <button style={{
              border: 'none',
              background: 'green',
              color: 'white',
              padding: '14px 24px',
              borderRadius: 5,
              fontSize: 16
  
            }}>SAVE</button>

          }

          

          
        </form>

      </aside>


    </div>
  )
}

export default App;