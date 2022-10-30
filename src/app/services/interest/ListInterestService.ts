import InterestArea from "../../models/InterestAreaModel";
class ListInterestService {
  async list() {
    const areas: InterestArea[] = await InterestArea.findAll();
    return areas;
  }
}

export default new ListInterestService();
