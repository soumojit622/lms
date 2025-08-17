import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { CourseSidebar } from "../components/CourseSidebar";


interface iAppProps {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

const Courselayout = async({ params, children }: iAppProps) => {

  const { slug } = await params;

  const course = await getCourseSidebarData(slug); 

  return (
    <div className="flex flex-1">
      {/* sidebar - 30% */}
      <div className="w-80 border-r border-border shrink-0">
        <CourseSidebar course={course.course} />
      </div>

      {/* main - 70% */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export default Courselayout