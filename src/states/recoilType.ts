export type UserDataState = {
  memberId: number;
  nickname: string;
};

export type InputValue = {
  title: string;
  content: string;
  optionA: string;
  optionB: string;
  tags: string[] | null;
  files: File[] | null;
};
