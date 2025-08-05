import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import { EditCourseForm } from "./components/EditCourseForm";
import { CourseStructure } from "./components/CourseStructure";

interface Props {
  params: Promise<{ courseId: string }>;
}

const EditRoute = async ({ params }: Props) => {
  const { courseId } = await params;

  const data = await adminGetCourse(courseId);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Edit Course: <span className="text-primary">{data.title}</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Modify course details or structure
        </p>
      </div>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Edit basic information about the course
              </CardDescription>
            </CardHeader>

            <CardContent>
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
                Here you can update your Course Structure
              </CardDescription>
            </CardHeader>

            <CardContent>
              <CourseStructure data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditRoute;
