import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CoursePerformance {
  averageScore: number;
  completionRate: number;
  numberOfComments: number;
}

interface CoursePerformanceBySubject {
  [subject: string]: CoursePerformance;
}

export function CoursePerform() {
  const [coursePerformance, setCoursePerformance] = useState<CoursePerformanceBySubject | null>(null);

  useEffect(() => {
    const fetchCoursePerformance = async () => {
      try {
        const response = await axios.get<{ coursePerformanceBySubject: CoursePerformanceBySubject }>(
          `${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/getcourseperfom`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCoursePerformance(response.data.coursePerformanceBySubject);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchCoursePerformance();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Matéria</TableHead>
          <TableHead>Média Geral</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coursePerformance &&
          Object.entries(coursePerformance).map(([course, performance]) => (
            <TableRow key={course}>
              <TableCell className="font-medium">{course}</TableCell>
              <TableCell>{performance.averageScore.toFixed(2)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
