import Mentor from "../../models/MentorModel";

class CreateMentorService {
  async createMentor(
    name: string,
    phone: string,
    chavePix: string,
    publicEmail: string,
    cnpj: string,
    userId: string,
    interestAreaId: string
  ) {
    const mentor: Mentor = await Mentor.create({
      name,
      phone,
      chavePix,
      publicEmail,
      cnpj,
      user_id: userId,
      interest_area_id: interestAreaId,
    });

    return mentor;
  }
}

export default new CreateMentorService();
