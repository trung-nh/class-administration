export class ExtractEmailMentioningUtils {
  static exec(notification: string): string[] {
    // base case
    if (!notification || notification.trim().length === 0) {
      return [''];
    }

    // Regex to match emails
    const EMAIL_EXTRACTION_REGEX = /@([\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})/g;

    // Extract emails
    const emails = [...notification.matchAll(EMAIL_EXTRACTION_REGEX)].map(
      (match) => match[1],
    );
    return emails.length ? emails : [''];
  }
}
