"use client"
import { Flex, Icon, Input, Textarea, Button, useToast, Text } from "@/once-ui/components";
import { baseURL, contact } from "@/app/resources";
import MobileTitle from "@/components/MobileTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useState, useEffect } from "react";
import { useIsMobile } from "@/components/MobileContext";

export async function generateMetadata() {
  const title = contact.title;
  const description = contact.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const formSchema = z.object({
  firstName: z
    .string({message: "First name is required"})
    .min(1, {message: "Please enter your first name"}),
  lastName: z
    .string({message: "Last name is required"})
    .min(1, {message: "Please enter your last name"}),
  email: z
    .string({message: "Email is required"})
    .email({message: "Please enter a valid email"}),
  subject: z
    .string({message: "Subject is required"})
    .min(4, {message: "Please be more specific"}),
  messageContent: z
    .string({message: "Message is required"})
    .min(1, {message: "Please write your message"})
})
type FormSchema = z.infer<typeof formSchema>;

export default function Contact() {
  const isMobile = useIsMobile();
  const { addToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCoolDown, setIsCoolDown] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      subject: undefined,
      messageContent: undefined
    },
    mode: 'onChange'
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const errorsInForm = () => {
    return Object.values(errors).some(error => error);
  };

  const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
    if (isCoolDown) {
      addToast({
        variant: "danger",
        message: "Please do not spam me"
      });
      return;
    }
  
    setIsCoolDown(true);
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
  
      setIsSubmitted(true);
      addToast({
        variant: "success",
        message: "Message sent successfully!",
      });
    } catch (error) {
      addToast({
        variant: "danger",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setTimeout(() => {
        setIsCoolDown(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      addToast({
        variant: "success",
        message: "Sent successfully",
      });
      setIsSubmitted(false);
    }
  }, [isSubmitted, addToast]);

  return (
  <form onSubmit={handleSubmit(onSubmitForm)}>
    <Flex
      paddingY="20"
      paddingX={isMobile ? undefined : "80"}
      gap="8"
      wrap
      horizontal="center"
      fitWidth
    >
        <MobileTitle page={contact} />
        <Input
          id="firstName"
          label="First name"
          error={errors.firstName ? true : false}
          errorMessage={errors.firstName?.message}
          hasPrefix={<Icon name="name" size="s"/>}
          {...register("firstName")}
        />
        <Input
          id="lastName"
          label="Last name"
          error={errors.lastName ? true : false}
          errorMessage={errors.lastName?.message}
          hasPrefix={<Icon name="name" size="s"/>}
          {...register("lastName")}
        />
        <Input
          id="email"
          label="Your email"
          error={errors.email ? true : false}
          errorMessage={errors.email?.message}
          hasPrefix={<Icon name="outlineEmail" size="s"/>}
          {...register("email")}
        />
        <Input
          id="subject"
          error={errors.subject ? true : false}
          errorMessage={errors.subject?.message}
          hasPrefix={<Icon name="subject" size="s"/>}
          label="Subject"
          {...register("subject")}
        />
        <Textarea
          id="message"
          error={errors.messageContent ? true : false}
          errorMessage={errors.messageContent?.message}
          label="Message"
          resize="vertical"
          lines={10}
          {...register("messageContent")}
        />
        <Flex margin="12">
          <Button
            type="submit"
            variant="primary"
            size="l"
            label="Send"
            disabled={errorsInForm() || isCoolDown}
          />
        </Flex>
      </Flex>
    </form>
  );
}