
import {CategoryModel, ICategory} from "../models/category.model";


export class CategoryService {
    async createCategory (data: Partial<ICategory>){
        const category = await CategoryModel.create(data);
        return category; 
    }

    async getCategory(){
        return CategoryModel.find().lean()
    }

    async updateCategory(name: string, data: Partial<ICategory>){
        const updated = await CategoryModel.findOneAndUpdate(
            {name}, data, {new: true}
        );
        return updated;
    }

    async deleteCategory(name: string){
        const deleted = await CategoryModel.findOneAndDelete({name});
        return deleted;
    }




}

