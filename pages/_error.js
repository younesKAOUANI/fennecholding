import { useTranslations } from "next-intl";

export default function Error({ statusCode, err }) {
  const t = useTranslations("error");

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-red-600">
        {statusCode ? `Error ${statusCode}` : "An Error Occurred"}
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        {err ? err.message : "Something went wrong. Please try again later."}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Check the console for more details.
      </p>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  try {
    return {
      props: {
        messages: require(`../messages/${locale}.json`),
      },
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return {
      props: {
        messages: require("../messages/en.json"),
      },
    };
  }
}