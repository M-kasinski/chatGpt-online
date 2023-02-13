export const template = ({
  query,
  current_date,
  web_results,
}: {
  query: string
  current_date: string
  web_results: string
}) => `Web search results:

${web_results}
Current date: ${current_date}

Instructions: Using the provided web search results, write a comprehensive reply to the given query. Make sure to cite results using [[number](URL)] notation after the reference. If the provided search results refer to multiple subjects with the same name, write separate answers for each subject.
Query: ${query}
Reply in Français`
