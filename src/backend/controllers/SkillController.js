const Skill = require('../utils/models/skill_schema');

class SkillController {
  static async createSkill(skillData) {
    try {
      const skill = new Skill(skillData);
      await skill.save();
      return { status: 201, message: 'Skill created successfully', data: skill };
    } catch (error) {
      return { status: 500, message: 'Internal server error', error: error.message };
    }
  }

  static async getSkillById(id) {
    try {
      const skill = await Skill.findById(id);
      if (!skill) return { status: 404, message: 'Skill not found' };
      return { status: 200, data: skill };
    } catch (error) {
      return { status: 500, message: 'Internal server error', error: error.message };
    }
  }

  static async getAllSkills() {
    try {
      const skills = await Skill.find({});
      return { status: 200, data: skills };
    } catch (error) {
      return { status: 500, message: 'Internal server error', error: error.message };
    }
  }

  static async updateSkill(id, updatedData) {
    try {
      const skill = await Skill.findByIdAndUpdate(id, updatedData, { new: true });
      if (!skill) return { status: 404, message: 'Skill not found' };
      return { status: 200, data: skill };
    } catch (error) {
      return { status: 500, message: 'Internal server error', error: error.message };
    }
  }

  static async deleteSkill(id) {
    try {
      const skill = await Skill.findByIdAndDelete(id);
      if (!skill) return { status: 404, message: 'Skill not found' };
      return { status: 200, message: 'Skill deleted successfully' };
    } catch (error) {
      return { status: 500, message: 'Internal server error', error: error.message };
    }
  }
}

module.exports = SkillController;
