export default class YoutubeHelper {
  /**
   * Returns the id of a Youtube video url
   * @param {string} url A youtube video url
   * @returns {string | null} The id of the youtube video
   */
  static getIdFromUrl(url: string): string | null {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    return null;
  }
}
