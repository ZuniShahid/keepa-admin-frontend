export interface Category {
  id: string;
  name: string;
}

export interface CreateCategoryVariables {
  body: {
    name: string;
  };
}

export interface DeleteCategoryVariables {
  id: string;
}

export interface UpdateCategoryBody {
  name: string;
}

export interface UpdateCategoryVariables {
  body: UpdateCategoryBody;
  id: string;
}
