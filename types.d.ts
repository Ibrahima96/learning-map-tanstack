interface IUser {
	email: string;
	password: string;
}
type StudentFormValues = {
	name: string;
	age: number;
	classe: string;
};

interface IStudentCard {
	_id: string;
	name: string;
	age: number;
	classe: string;
	createdAt?: string;
}
