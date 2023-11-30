import type { AnnotationBody, PresentUser, User } from '@annotorious/react';
import type { SupabaseAnnotation } from '@recogito/annotorious-supabase';

/** Determines the list of unique creators in the given annotation list **/
export const enumerateCreators = (present: PresentUser[], annotations: SupabaseAnnotation[]) =>
  annotations.reduce((enumerated, a) => {
    const presentCreator = present.find(p => p.id === a.target.creator?.id || a.target.creator);
    if (presentCreator) {
      const exists = enumerated.find(u => u.id === presentCreator.id);
      return exists ? enumerated : [...enumerated, presentCreator];
    } else {
      const { creator } = a.target;
      if (creator) {
        const exists = enumerated.find(u => u.id === creator.id);
        return exists ? enumerated : [...enumerated, creator];
      } else {
        return enumerated;
      }
    }
  }, [] as User[]);

/** Returns an appropriate display name for the given (Present)User **/
export const getDisplayName = (user?: PresentUser | User) => {
  if (user) {
    return 'appearance' in user ? 
      (user as PresentUser).appearance.label : user.name || 'Anonymous';
  } else {
    return 'Anonymous';
  }
}

/** Determines the list of unique tags in the given annotation list **/
export const enumerateTags = (annotations: SupabaseAnnotation[]) => 
  annotations.reduce((enumerated, annotation) => {
    const tags = annotation.bodies.filter(b => b.purpose === 'tagging');
    return [...enumerated, ...tags];
  }, [] as AnnotationBody[])
  .sort((a, b) => a.created! > b.created! ? 1 : -1)
  .reduce((firstOccurrences, body) => {
    if (body.value) {
      return firstOccurrences.indexOf(body.value) < 0 ? [...firstOccurrences, body.value] : firstOccurrences;
    } else {
      return firstOccurrences;
    }
  }, [] as string[]);