import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

// ADVENTURE ESCAPE SA

const EXPERIENCES = [
  {
    slug: "ultimate-adventure-day",
    kind: "package",
    name: "Ultimate Adventure Day",
    price: 1500,
    duration: "Full day",
    place: "Hottentots Holland",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1000",
    blurb: "A mixed day of trail, teamwork and viewpoints for groups who want variety.",
    story: "Start under tall pines, move onto open ridges, then finish with a guided challenge that only works if the group actually talks to each other. Guides set the pace so mixed fitness levels stay together.",
    includes: ["Certified guides", "Trail and ridge walk", "Team challenge", "Safety kit", "Water and a trail snack"],
    who: "Friends, mixed families with older children, and small groups.",
  },
  {
    slug: "family-explorer",
    kind: "package",
    name: "Family Explorer Package",
    price: 1500,
    duration: "Half to full day",
    place: "Constantia & Helderberg",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1000",
    blurb: "Slow enough for children, interesting enough that adults stop checking their phones.",
    story: "Short forest sections, a stream stop, and a summit only if the group wants it. Guides keep the day playful without turning it into a race.",
    includes: ["Family-trained guides", "Nature scavenger brief", "Flexible distance", "Safety kit", "Water"],
    who: "Families, school groups and first-time hikers.",
  },
  {
    slug: "mountain-adventure",
    kind: "package",
    name: "Mountain Adventure Package",
    price: 1500,
    duration: "Full day",
    place: "Cape Fold Mountains",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000",
    blurb: "A proper mountain day: steady ascent, fynbos, and a view that earns the climb.",
    story: "You walk into sandstone and wind. The route is chosen for weather that morning, with a real summit option and a shorter ridge if the group needs it.",
    includes: ["Mountain guide", "Route choice on the day", "Navigation brief", "Emergency kit", "Water"],
    who: "Adults and teens comfortable with a full day on foot.",
  },
  {
    slug: "corporate-team-challenge",
    kind: "package",
    name: "Corporate Team Challenge",
    price: 1500,
    duration: "Half day",
    place: "Peninsula trails",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000",
    blurb: "Outdoor problems that only get solved if people actually listen.",
    story: "No trust-fall theatre. Stations on the trail ask a team to plan, carry, and decide under a clock, then debrief in the shade before heading back.",
    includes: ["Facilitator and safety guide", "Timed stations", "Debrief", "Kit", "Water"],
    who: "Companies, departments and leadership groups.",
  },
  {
    slug: "ziplining",
    kind: "activity",
    name: "Ziplining Adventure",
    price: 750,
    duration: "2 hours",
    place: "Constantia Nek",
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1000",
    blurb: "Cables over a green valley, with a walk between platforms and a guide on every line.",
    story: "You ride several lines above fynbos and forest. Briefing is unhurried. Speed is controlled. The view is the point.",
    includes: ["Harness and helmet", "Two guides", "Safety briefing", "Photos on request"],
    who: "Anyone within the weight limit who is fine with height.",
  },
  {
    slug: "kayaking",
    kind: "activity",
    name: "Kayaking Experience",
    price: 750,
    duration: "2 hours",
    place: "Western Cape rivers",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1000",
    blurb: "A calm paddle with instruction, not a white-water test.",
    story: "You launch from a quiet bank, learn a stroke that actually works, and follow the guide through reeds and open water.",
    includes: ["Kayak and paddle", "Life jacket", "Guide", "Dry bag for a phone"],
    who: "Beginners and anyone who can sit and paddle.",
  },
  {
    slug: "rock-climbing",
    kind: "activity",
    name: "Rock Climbing Session",
    price: 750,
    duration: "3 hours",
    place: "Peninsula crags",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1000",
    blurb: "Real rock, a top rope, and an instructor who explains the next hold before you need it.",
    story: "Routes are chosen for the group. You learn how to tie in, how to trust the rope, and how to come down without drama.",
    includes: ["Harness, shoes and helmet", "Certified instructor", "Top-rope routes", "Technique coaching"],
    who: "First-timers and returning climbers.",
  },
];

const NAV_ITEMS = ["Home", "About", "Packages", "Activities", "Quote", "Saved"];

const money = (value) =>
  "R" + Number(value).toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function App() {
  const [page, setPage] = useState("Home");
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState([]);
  const [detail, setDetail] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showQuote, setShowQuote] = useState(false);

  const packages = EXPERIENCES.filter((item) => item.kind === "package");
  const activities = EXPERIENCES.filter((item) => item.kind === "activity");

  const totals = useMemo(() => {
    const picked = EXPERIENCES.filter((item) =>
      selected.includes(item.slug)
    );

    const subtotal = picked.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const count = picked.length;

    const discountPercent =
      count >= 4 ? 15 : count === 3 ? 10 : count === 2 ? 5 : 0;

    const discount = subtotal * (discountPercent / 100);
    const afterDiscount = subtotal - discount;
    const vat = afterDiscount * 0.15;

    return {
      picked,
      subtotal,
      count,
      discountPercent,
      discount,
      vat,
      total: afterDiscount + vat,
    };
  }, [selected]);

  function toggleSaved(slug) {
    setSaved((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    );
  }

  function toggleSelected(slug) {
    setSelected((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    );

    setShowQuote(false);
  }

  function openQuote(slug) {
    if (slug && !selected.includes(slug)) {
      setSelected((current) => [...current, slug]);
    }

    setDetail(null);
    setPage("Quote");
    setShowQuote(false);
  }

  function calculateQuote() {
    if (!fullName.trim() || !email.trim().includes("@")) {
      Alert.alert(
        "Missing details",
        "Please enter your name and a valid email address."
      );
      return;
    }

    if (selected.length === 0) {
      Alert.alert(
        "Choose an experience",
        "Please select at least one package or activity."
      );
      return;
    }

    setShowQuote(true);
  }

  function Header() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setPage("Home");
            setDetail(null);
          }}
        >
          <Text style={styles.logo}>
            Adventure <Text style={styles.logoAccent}>Escape</Text>
          </Text>
          <Text style={styles.logoSub}>SOUTH AFRICA</Text>
        </TouchableOpacity>

        <Text style={styles.headerIcon}>🌿</Text>
      </View>
    );
  }

  function ExperienceCard({ item }) {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
        />

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.name}</Text>

          <Text style={styles.muted}>{item.blurb}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>◷ {item.duration}</Text>
            <Text style={styles.meta}>⌖ {item.place}</Text>
          </View>

          <Text style={styles.price}>
            {money(item.price)} per person
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.lightButton}
              onPress={() => toggleSaved(item.slug)}
            >
              <Text style={styles.darkButtonText}>
                {saved.includes(item.slug) ? "♥ Saved" : "♡ Save"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => setDetail(item)}
            >
              <Text style={styles.outlineText}>View details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.orangeButtonSmall}
              onPress={() => openQuote(item.slug)}
            >
              <Text style={styles.whiteText}>Quote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function PageTitle({ title, subtitle }) {
    return (
      <View style={styles.pageIntro}>
        <Text style={styles.pageTitle}>{title}</Text>
        {!!subtitle && (
          <Text style={styles.muted}>{subtitle}</Text>
        )}
      </View>
    );
  }

  function DetailPage({ item }) {
    return (
      <View style={styles.section}>
        <TouchableOpacity onPress={() => setDetail(null)}>
          <Text style={styles.backLink}>← Back to experiences</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: item.image }}
          style={styles.detailImage}
        />

        <Text style={styles.pageTitle}>{item.name}</Text>

        <Text style={styles.price}>
          {money(item.price)} per person
        </Text>

        <Text style={styles.meta}>
          {item.duration} • {item.place}
        </Text>

        <Text style={styles.detailStory}>{item.story}</Text>

        <Text style={styles.subheading}>What's included</Text>

        {item.includes.map((value) => (
          <Text key={value} style={styles.listItem}>
            ✓ {value}
          </Text>
        ))}

        <Text style={styles.subheading}>Who it's for</Text>
        <Text style={styles.muted}>{item.who}</Text>

        <TouchableOpacity
          style={styles.orangeButton}
          onPress={() => openQuote(item.slug)}
        >
          <Text style={styles.whiteText}>Add to quote</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function HomePage() {
    return (
      <>
        <View style={styles.hero}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200",
            }}
            style={styles.heroImage}
          />

          <View style={styles.heroShade} />

          <View style={styles.heroContent}>
            <Text style={styles.eyebrow}>
              WESTERN CAPE • EST. 2024
            </Text>

            <Text style={styles.heroTitle}>
              Discover.{"\n"}Explore.{"\n"}Escape.
            </Text>

            <Text style={styles.heroText}>
              One place to compare guided outdoor days, then see
              the price before you enquire.
            </Text>

            <TouchableOpacity
              style={styles.orangeButton}
              onPress={() => setPage("Packages")}
            >
              <Text style={styles.whiteText}>See packages →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.transparentButton}
              onPress={() => setPage("Quote")}
            >
              <Text style={styles.whiteText}>Calculate a quote</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <PageTitle
            title="Packages"
            subtitle="Four guided days. Each is R1 500 per person."
          />

          {packages.map((item) => (
            <ExperienceCard key={item.slug} item={item} />
          ))}
        </View>

        <View style={[styles.section, styles.paperSection]}>
          <PageTitle
            title="Add an activity"
            subtitle="Ziplining, kayaking or climbing. Combine bookings and save."
          />

          {activities.map((item) => (
            <ExperienceCard key={item.slug} item={item} />
          ))}
        </View>

        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>
            More you book, more you save
          </Text>

          <Text style={styles.infoText}>
            One booking is full price. Two is 5% off, three is
            10%, and four or more is 15%. VAT of 15% is added
            after the discount.
          </Text>
        </View>
      </>
    );
  }

  function QuotePage() {
    return (
      <View style={styles.section}>
        <PageTitle
          title="Instant quote"
          subtitle="Select experiences to see a transparent estimate. This is a quote, not an invoice."
        />

        <View style={styles.formCard}>
          <Text style={styles.label}>Full name</Text>

          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />

          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Phone</Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <Text style={styles.subheading}>
            Packages and activities
          </Text>

          {EXPERIENCES.map((item) => {
            const checked = selected.includes(item.slug);

            return (
              <TouchableOpacity
                key={item.slug}
                style={[
                  styles.checkRow,
                  checked && styles.checkedRow,
                ]}
                onPress={() => toggleSelected(item.slug)}
              >
                <Text style={styles.checkMark}>
                  {checked ? "☑" : "□"}
                </Text>

                <Text style={styles.checkName}>{item.name}</Text>

                <Text style={styles.priceSmall}>
                  {money(item.price)}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.orangeButton}
            onPress={calculateQuote}
          >
            <Text style={styles.whiteText}>Calculate quote</Text>
          </TouchableOpacity>
        </View>

        {showQuote && (
          <View style={styles.quotePanel}>
            <Text style={styles.quoteHeading}>Your quote</Text>

            <Text style={styles.quoteSmall}>
              {totals.count} experience(s) selected
            </Text>

            {totals.picked.map((item) => (
              <View key={item.slug} style={styles.totalRow}>
                <Text style={styles.quoteText}>{item.name}</Text>
                <Text style={styles.quoteText}>
                  {money(item.price)}
                </Text>
              </View>
            ))}

            <View style={styles.separator} />

            <View style={styles.totalRow}>
              <Text style={styles.quoteText}>Subtotal</Text>
              <Text style={styles.quoteText}>
                {money(totals.subtotal)}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.quoteText}>
                Discount ({totals.discountPercent}%)
              </Text>
              <Text style={styles.quoteText}>
                −{money(totals.discount)}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.quoteText}>VAT (15%)</Text>
              <Text style={styles.quoteText}>
                {money(totals.vat)}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.quoteTotalLabel}>
                Quoted total
              </Text>
              <Text style={styles.quoteTotal}>
                {money(totals.total)}
              </Text>
            </View>

            <Text style={styles.quoteSmall}>
              Thank you, {fullName}. This estimate is not a
              confirmed booking or tax invoice.
            </Text>
          </View>
        )}
      </View>
    );
  }

  function AboutPage() {
    return (
      <View style={styles.section}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1000",
          }}
          style={styles.aboutImage}
        />

        <Text style={styles.eyebrowDark}>THE CLIENT</Text>

        <Text style={styles.pageTitle}>
          Built for people who would rather be outside.
        </Text>

        <Text style={styles.detailStory}>
          Liam Daniels started Adventure Escape SA in 2024 after
          watching families, schools and visiting groups bounce
          between operators just to book one decent day.
        </Text>

        <Text style={styles.detailStory}>
          The company runs professionally guided outdoor
          adventures across the Western Cape for every age and
          experience level. Teamwork, fitness and time in nature
          are the point — the website is only the first step.
        </Text>

        <View style={styles.valueCard}>
          <Text style={styles.subheading}>Our vision</Text>
          <Text style={styles.muted}>
            The trusted first stop for outdoor days in the
            Western Cape.
          </Text>
        </View>

        <View style={styles.valueCard}>
          <Text style={styles.subheading}>Our mission</Text>
          <Text style={styles.muted}>
            Make discovery, comparison and quoting simple enough
            that the adventure stays the exciting part.
          </Text>
        </View>

        <View style={styles.valueCard}>
          <Text style={styles.subheading}>Who it is for</Text>
          <Text style={styles.muted}>
            Individuals, families, schools, visitors and corporate
            teams.
          </Text>
        </View>

        <Text style={styles.subheading}>Contact</Text>
        <Text style={styles.muted}>
          hello@adventureescapesa.co.za
        </Text>
        <Text style={styles.muted}>+27 21 555 0199</Text>
      </View>
    );
  }

  function CurrentPage() {
    if (detail) {
      return <DetailPage item={detail} />;
    }

    if (page === "Home") {
      return <HomePage />;
    }

    if (page === "Packages") {
      return (
        <View style={styles.section}>
          <PageTitle
            title="Packages"
            subtitle="Four full experiences at R1 500 per person."
          />

          {packages.map((item) => (
            <ExperienceCard key={item.slug} item={item} />
          ))}
        </View>
      );
    }

    if (page === "Activities") {
      return (
        <View style={styles.section}>
          <PageTitle
            title="Activities"
            subtitle="Three shorter sessions at R750 per person."
          />

          {activities.map((item) => (
            <ExperienceCard key={item.slug} item={item} />
          ))}
        </View>
      );
    }

    if (page === "Quote") {
      return <QuotePage />;
    }

    if (page === "Saved") {
      const savedItems = EXPERIENCES.filter((item) =>
        saved.includes(item.slug)
      );

      return (
        <View style={styles.section}>
          <PageTitle
            title="Saved experiences"
            subtitle="Your shortlist of outdoor adventures."
          />

          {savedItems.length === 0 ? (
            <Text style={styles.muted}>
              You have not saved any experiences yet.
            </Text>
          ) : (
            savedItems.map((item) => (
              <ExperienceCard key={item.slug} item={item} />
            ))
          )}
        </View>
      );
    }

    return <AboutPage />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0A2540"
      />

      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CurrentPage />

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>
            Adventure Escape SA
          </Text>

          <Text style={styles.footerText}>
            Discover. Explore. Escape.
          </Text>

          <Text style={styles.footerText}>
            Western Cape, South Africa
          </Text>

          <Text style={styles.footerCopyright}>
            © 2026 Adventure Escape SA
          </Text>
        </View>
      </ScrollView>

      {!detail && (
        <View style={styles.navigation}>
          {NAV_ITEMS.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.navItem}
              onPress={() => {
                setPage(item);
                setShowQuote(false);
              }}
            >
              <Text
                style={[
                  styles.navIcon,
                  page === item && styles.navActive,
                ]}
              >
                {{
                  Home: "⌂",
                  About: "ⓘ",
                  Packages: "◆",
                  Activities: "♧",
                  Quote: "R",
                  Saved: "♡",
                }[item]}
              </Text>

              <Text
                style={[
                  styles.navLabel,
                  page === item && styles.navActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
  },

  header: {
    backgroundColor: "#0A2540",
    paddingHorizontal: 18,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: "#FFF6DC",
    fontSize: 20,
    fontWeight: "800",
  },

  logoAccent: {
    color: "#E85D04",
  },

  logoSub: {
    color: "#FFF6DC",
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 2,
  },

  headerIcon: {
    fontSize: 25,
  },

  hero: {
    minHeight: 490,
    backgroundColor: "#0A2540",
    justifyContent: "flex-end",
  },

  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,37,64,0.58)",
  },

  heroContent: {
    paddingHorizontal: 23,
    paddingVertical: 30,
  },

  eyebrow: {
    color: "#F28A38",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 2,
  },

  eyebrowDark: {
    color: "#E85D04",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 22,
  },

  heroTitle: {
    color: "#FFF6DC",
    fontSize: 43,
    fontWeight: "900",
    lineHeight: 49,
    marginTop: 13,
  },

  heroText: {
    color: "#FFF6DC",
    fontSize: 15,
    lineHeight: 23,
    marginVertical: 15,
  },

  section: {
    padding: 18,
  },

  pageIntro: {
    marginBottom: 13,
  },

  pageTitle: {
    color: "#0A2540",
    fontSize: 31,
    fontWeight: "800",
    marginBottom: 8,
  },

  muted: {
    color: "#5B6570",
    fontSize: 14,
    lineHeight: 21,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#EADFBF",
  },

  cardImage: {
    width: "100%",
    height: 205,
    backgroundColor: "#EADFBF",
  },

  cardBody: {
    padding: 16,
  },

  cardTitle: {
    color: "#0A2540",
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 7,
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },

  meta: {
    color: "#68727C",
    fontSize: 12,
    marginVertical: 3,
  },

  price: {
    color: "#1F6B2C",
    fontWeight: "800",
    fontSize: 16,
    marginTop: 12,
  },

  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 8,
  },

  lightButton: {
    backgroundColor: "#FFF6DC",
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 22,
    marginRight: 6,
    marginTop: 5,
  },

  darkButtonText: {
    color: "#0A2540",
    fontWeight: "700",
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: "#0A2540",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 22,
    marginRight: 6,
    marginTop: 5,
  },

  outlineText: {
    color: "#0A2540",
    fontWeight: "700",
  },

  orangeButtonSmall: {
    backgroundColor: "#E85D04",
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 22,
    marginTop: 5,
  },

  orangeButton: {
    backgroundColor: "#E85D04",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 12,
  },

  transparentButton: {
    borderWidth: 1,
    borderColor: "#FFF6DC",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 8,
  },

  whiteText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
  },

  paperSection: {
    backgroundColor: "#FFF6DC",
  },

  infoPanel: {
    backgroundColor: "#0A2540",
    padding: 23,
    margin: 18,
    borderRadius: 18,
  },

  infoTitle: {
    color: "#E85D04",
    fontSize: 22,
    fontWeight: "800",
  },

  infoText: {
    color: "#FFF6DC",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },

  formCard: {
    backgroundColor: "#FFF6DC",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EADFBF",
  },

  label: {
    color: "#0A2540",
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EADFBF",
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
  },

  subheading: {
    color: "#0A2540",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 8,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EADFBF",
    borderRadius: 12,
    padding: 12,
    marginVertical: 5,
  },

  checkedRow: {
    borderColor: "#1F6B2C",
    backgroundColor: "#F0F6EC",
  },

  checkMark: {
    color: "#1F6B2C",
    fontSize: 20,
    marginRight: 9,
  },

  checkName: {
    flex: 1,
    color: "#0A2540",
    fontSize: 13,
    fontWeight: "600",
  },

  priceSmall: {
    color: "#1F6B2C",
    fontWeight: "700",
    fontSize: 12,
  },

  quotePanel: {
    backgroundColor: "#0A2540",
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
  },

  quoteHeading: {
    color: "#FFF6DC",
    fontSize: 25,
    fontWeight: "800",
    marginBottom: 5,
  },

  quoteSmall: {
    color: "#D8DFE6",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },

  quoteText: {
    color: "#FFF6DC",
    fontSize: 13,
    flexShrink: 1,
  },

  quoteTotalLabel: {
    color: "#FFF6DC",
    fontSize: 17,
    fontWeight: "800",
  },

  quoteTotal: {
    color: "#E85D04",
    fontSize: 20,
    fontWeight: "900",
  },

  separator: {
    height: 1,
    backgroundColor: "#FFFFFF40",
    marginTop: 15,
  },

  detailImage: {
    width: "100%",
    height: 230,
    borderRadius: 17,
    marginTop: 15,
    marginBottom: 18,
  },

  backLink: {
    color: "#1F6B2C",
    fontWeight: "700",
    marginBottom: 5,
  },

  detailStory: {
    color: "#46515C",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 14,
  },

  listItem: {
    color: "#46515C",
    fontSize: 14,
    marginVertical: 5,
  },

  aboutImage: {
    width: "100%",
    height: 230,
    borderRadius: 18,
    marginBottom: 8,
  },

  valueCard: {
    backgroundColor: "#FFF6DC",
    borderRadius: 15,
    padding: 15,
    marginVertical: 7,
  },

  footer: {
    backgroundColor: "#0A2540",
    padding: 25,
    alignItems: "center",
  },

  footerBrand: {
    color: "#FFF6DC",
    fontSize: 20,
    fontWeight: "800",
  },

  footerText: {
    color: "#E6E1D5",
    fontSize: 13,
    marginTop: 6,
  },

  footerCopyright: {
    color: "#AAB6C1",
    fontSize: 11,
    marginTop: 15,
  },

  navigation: {
    flexDirection: "row",
    backgroundColor: "#0A2540",
    paddingTop: 9,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF20",
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  navIcon: {
    color: "#FFF6DC",
    fontSize: 19,
    marginBottom: 3,
  },

  navLabel: {
    color: "#FFF6DC",
    fontSize: 9,
  },

  navActive: {
    color: "#E85D04",
    fontWeight: "900",
  },
});