// diaryEntry.js
class DiaryEntry {
    constructor(db) {
      this.db = db;
    }
  
    async create(userId, title, description, date, location, photos) {
      try {
        await this.db.run(
          'INSERT INTO diary_entries (user_id, title, description, date, location, photos) VALUES (?, ?, ?, ?, ?, ?)',
          [userId, title, description, date, location, photos]
        );
        return { success: true };
      } catch (error) {
        console.error('Error creating diary entry:', error);
        throw new Error('Failed to create diary entry');
      }
    }
  
    async update(id, title, description, date, location, photos) {
      try {
        await this.db.run(
          'UPDATE diary_entries SET title = ?, description = ?, date = ?, location = ?, photos = ? WHERE id = ?',
          [title, description, date, location, photos, id]
        );
        return { success: true };
      } catch (error) {
        console.error('Error updating diary entry:', error);
        throw new Error('Failed to update diary entry');
      }
    }

    async getDiaryEntries() {
        try {
            const diaryEntries = await this.db.all('SELECT * FROM diary_entries');
            return diaryEntries;
        } catch (error) {
            console.error('Error getting diary entries:', error);
            throw new Error('Failed to get diary entries');
        }
    }
  
    async delete(id) {
      try {
        await this.db.run('DELETE FROM diary_entries WHERE id = ?', [id]);
        return { success: true };
      } catch (error) {
        console.error('Error deleting diary entry:', error);
        throw new Error('Failed to delete diary entry');
      }
    }
  }
  
  module.exports = DiaryEntry;
  