import { observer } from 'mobx-react-lite';
import { CardItem } from '../components/CardItem';
import { useContext, useEffect } from "react";
import { Context } from '../main';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { getCourse } from '../http/CourseAPI';

const Course = observer( () => {
  const {user} = useContext(Context)
  const id_role = JSON.parse(localStorage.getItem('id_role'))

  const {course} = useContext(Context)

  useEffect(() =>{
    getCourse(localStorage.getItem('id_role')).then(data => course.setCourse(data.data))
  }, [])
  

  if (JSON.parse(localStorage.getItem('isAuth')) === false) return <Redirect to={'/registration'}/>
  return (
    <div className='container mt-4' style={{marginBottom: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "10%", rowGap: "1%", alignItems: "center"}}>
     
     {
     course.course.map(item => <CardItem key={item.id} info={item} />)}
        
    </div>
  );
})

export {Course};
