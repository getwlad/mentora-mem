import Student from "../../models/StudentModel";

class CreateStudentService {
  async createStudent(name: string, cpf: string, phone: string, userId: string) {
    const student: Student = await Student.create({
      name,
      cpf,
      phone,
      user_id: userId,
      points: 0,
    });

    return student;
  }
}

export default new CreateStudentService();
