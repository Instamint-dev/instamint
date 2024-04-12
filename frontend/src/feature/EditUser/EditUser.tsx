import { ChangeEvent, FormEvent, useState } from "react";
import CustomLabelForm from "../../components/CustomLabelForm.tsx";
import CustomInput from "../../components/CustomInput.tsx";
import CustomButton from "../../components/CustomButton.tsx";
import CustomTextarea from "../../components/CustomTextarea.tsx";
import CustomButtonRadio from "../../components/CustomButtonRadio.tsx";
import UserProfile from "../../type/feature/user/user_profil.ts";
import {updateProfile} from "./service/EditUserService.tsx";

const EditUser = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [formData, setFormData] = useState<UserProfile>({
        username: "",
        email: "",
        profilePhoto: undefined,
        bio: "",
        visibility: "public",
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        setSuccess("")
        try {
            await updateProfile(formData)
            setSuccess("Successful registration. You are now registered")
        } catch (err: unknown) {
            if ((err as Error).message) {
                setError((err as Error).message || "Error registering")
            } else {
                setError("Error registering")
            }
        }

    };


    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleVisibilityChange = (value: "public" | "private") => {
        setFormData({ ...formData, visibility: value });
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                setFormData({ ...formData, profilePhoto: dataUrl });
            };
            reader.onerror = (error) => {
                console.error("Error handling file change:", error);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex justify-center mt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                <h1 className="font-bold flex justify-center">Inscription</h1>

                <div className="flex justify-center items-center mt-4 mr-8 mb-4 ml-8">
                    <div className="relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <input
                            type="file"
                            name="profilePhoto"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {formData.profilePhoto && typeof formData.profilePhoto === 'string' && (
                            <img className="w-full h-full rounded" src={formData.profilePhoto} alt="" />
                        )}
                        {/*{formData.profilePhoto && typeof formData.profilePhoto !== 'string' && (*/}
                        {/*    <img className="w-full h-full rounded" src={`data:image/jpeg;base64,${formData.profilePhoto.toString('base64')}`} alt="" />*/}
                        {/*)}*/}
                    </div>
                </div>

                <div className="flex  justify-center">
                    <div className="flex items-center me-4">
                        <CustomButtonRadio
                            type="radio"
                            value="private"
                            checked={formData.visibility === "private"}
                            onChange={() => handleVisibilityChange("private")}
                        />
                        <CustomButtonRadio
                            type="radio"
                            value="public"
                            checked={formData.visibility === "public"}
                            onChange={() => handleVisibilityChange("public")}
                        />
                    </div>
                </div>

                <div className="my-2">
                    <CustomLabelForm htmlFor="username">Username</CustomLabelForm>
                    <CustomInput
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                </div>
                <div className="my-2">
                    <CustomLabelForm htmlFor="email">Email</CustomLabelForm>
                    <CustomInput
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
                <div className="my-2">
                    <CustomLabelForm htmlFor="bio">Your bio</CustomLabelForm>
                    <CustomTextarea
                        name="bio"
                        onChange={handleChange}
                        value={formData.bio}
                        placeholder="Your bio"
                        rows={3}
                    />
                </div>
                <div className="my-2">
                    <div className="flex justify-end">
                        <CustomButton value="Validate" type="submit" />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </div>
            </form>
        </div>
    );
};

export default EditUser;
