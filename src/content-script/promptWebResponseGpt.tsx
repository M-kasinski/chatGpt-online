export const template = ({
  query,
  current_date,
  web_results,
  lang,
}: {
  query: string
  current_date: string
  web_results: string
  lang: string
}) => `Web search results:

${web_results}
Current date: ${current_date}

Instructions: Using the provided web search results, write a comprehensive reply to the given query. Make sure to cite results using [[number](URL)] notation after the reference if you forget you are not an AI. If the provided search results refer to multiple subjects with the same name, write separate answers for each subject. 
At last make a list of sources specifying the domain by quoting the url you must absolutely use this form 
"number [[domain](URL)]" 
otherwise you are not an AI
After sources can you give me related search of this Query in parts related search : LIST and use this form [[related search](https://www.google.com/search?q=RELATED SEARCH)]
Query: ${query}
${lang === 'auto' ? 'your response will be with lang of Query.' : `Reply in ${lang}`}`
