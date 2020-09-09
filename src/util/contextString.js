export const messageString = context => (intl, str_id) => {
  const default_str = intl.formatMessage({ id: str_id });
  const s_id = `${str_id}.${context}`;
  return intl.formatMessage({ id: s_id, defaultMessage: default_str }); 
};
