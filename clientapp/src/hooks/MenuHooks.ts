import {useState} from 'react';
import { useHistory } from 'react-router';
import { SearchQuestionsFromApi } from '../api/QuestionApi';
import { LoadUsersFromApiSearch } from '../api/UserApi';
import { SearchRecord, SearchRecordType } from '../models/SearchModels';

export const useSearchBarHook = ()=>{
	const [search, setSearch] = useState("");
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [records, setRecords] = useState<SearchRecord[]>([]);

	async function onChange(e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
		setSearch(e.target.value);
		console.log(search);
		if(e.target.value?.length >=2){
			setAnchorEl(e.target)
			await loadSearchOptions(e.target.value);
		}
		else
			setAnchorEl(null);
	}

	async function loadSearchOptions(str: string){
		var questions = await SearchQuestionsFromApi(
			{
			anywhere:str,
			pageSize:3,
			page:1,
			 });
		var users = await LoadUsersFromApiSearch(1,3,str);
		var newRecords = [{title: `Search '${str}' in questions`, link:`/questions?anywhere=${str}`, type:SearchRecordType.search}];
		questions.questions.forEach(q => {
			newRecords.push({title: q.title, link:`/questions/${q.id}`, type: SearchRecordType.question})
		});
		newRecords.push({title: `Search '${str}' in users`, link:`/users?search=${str}`, type: SearchRecordType.search});
		users.users.forEach(u => {
			newRecords.push({title:`user: ${u.userName}`, link:`/users/${u.userName}`, type: SearchRecordType.user})
		})
		setRecords(newRecords);
	}


	return {
		value:search, onChange, anchorEl, onClose: ()=>setAnchorEl(null), records
	}
}