import { observer } from "mobx-react-lite"
import { CardItem } from "../../CardItem"
import { CreateNewCourse } from "../CreateNewCourse"
import { useContext, useEffect } from "react"
import { Context } from "../../../main"
import { getAll } from "../../../http/CourseAPI"
import { BlankPage } from "../../BlankPage"


const MultiCourseAndBlockPage = observer((props) => {

    const {course} = useContext(Context)

    
    return (
        <>
            <CreateNewCourse  role={props.role} />
            <div className='container mt-4' style={{marginBottom: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "10%", rowGap: "1%", alignItems: "center"}}>
                {course.getCourseByRole(`${props.role}`).length == 0 ? <BlankPage /> : course.getCourseByRole(`${props.role}`).map(item => <CardItem key={item.id} info={item} />)}
                
            </div>
        </>
    )
})

export { MultiCourseAndBlockPage }