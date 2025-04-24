import { useRouter } from "next/router";
    import { i18n } from "../../i18n";

    export default function LanguageSwitcher() {
      const router = useRouter();
      const { pathname, locale } = router;

      const handleChange = (newLocale) => {
        router.push(pathname, pathname, { locale: newLocale });
      };

      return (
        <select
          value={locale}
          onChange={(e) => handleChange(e.target.value)}
          className="px-3 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent text-primary"
        >
          {i18n.locales.map((loc) => (
            <option key={loc} value={loc}>
              {loc.toUpperCase()}
            </option>
          ))}
        </select>
      );
    }