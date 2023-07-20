registerSettingsPage(() => (
  <Page>
    <Text bold align="center">
      StyleTime Settings
    </Text>
    <Section title="Weather">
      <TextInput settingsKey="weatherZipCode" label="Postal Code (REQUIRED)" />
      <Select
        selectViewTitle="Select Weather Units"
        label="Units (Default: °F)"
        settingsKey="weatherUnits"
        options={[
          {
            name: '°F',
            value: 'imperial'
          },
          { name: '°C', value: 'metric' }
        ]}
      />
    </Section>
    <Section title={<Text>Background Color</Text>}>
      <ColorSelect
        settingsKey="backgroundColor"
        colors={[
          { color: 'white' },
          { color: 'silver' },
          { color: 'grey' },
          { color: 'black' },
          { color: 'navy' },
          { color: 'blue' },
          { color: 'turquoise' },
          { color: 'cyan' },
          { color: 'green' },
          { color: 'lime' },
          { color: 'chartreuse' },
          { color: 'olive' },
          { color: 'yellow' },
          { color: 'gold' },
          { color: 'orange' },
          { color: 'brown' },
          { color: 'red' },
          { color: 'maroon' },
          { color: 'pink' },
          { color: 'magenta' },
          { color: 'purple' },
          { color: 'indigo' },
          { color: 'violet' },
          { color: 'plum' }
        ]}
      />
    </Section>
    <Section title={<Text>Hours Color</Text>}>
      <ColorSelect
        settingsKey="hoursColor"
        colors={[
          { color: 'white' },
          { color: 'silver' },
          { color: 'grey' },
          { color: 'black' },
          { color: 'navy' },
          { color: 'blue' },
          { color: 'turquoise' },
          { color: 'cyan' },
          { color: 'green' },
          { color: 'lime' },
          { color: 'chartreuse' },
          { color: 'olive' },
          { color: 'yellow' },
          { color: 'gold' },
          { color: 'orange' },
          { color: 'brown' },
          { color: 'red' },
          { color: 'maroon' },
          { color: 'pink' },
          { color: 'magenta' },
          { color: 'purple' },
          { color: 'indigo' },
          { color: 'violet' },
          { color: 'plum' }
        ]}
      />
    </Section>
    <Section title={<Text>Minutes Color</Text>}>
      <ColorSelect
        settingsKey="minutesColor"
        colors={[
          { color: 'white' },
          { color: 'silver' },
          { color: 'grey' },
          { color: 'black' },
          { color: 'navy' },
          { color: 'blue' },
          { color: 'turquoise' },
          { color: 'cyan' },
          { color: 'green' },
          { color: 'lime' },
          { color: 'chartreuse' },
          { color: 'olive' },
          { color: 'yellow' },
          { color: 'gold' },
          { color: 'orange' },
          { color: 'brown' },
          { color: 'red' },
          { color: 'maroon' },
          { color: 'pink' },
          { color: 'magenta' },
          { color: 'purple' },
          { color: 'indigo' },
          { color: 'violet' },
          { color: 'plum' }
        ]}
      />
    </Section>
    <Section title={<Text>Sidebar Color</Text>}>
      <ColorSelect
        settingsKey="sidebarColor"
        colors={[
          { color: 'white' },
          { color: 'silver' },
          { color: 'grey' },
          { color: 'black' },
          { color: 'navy' },
          { color: 'blue' },
          { color: 'turquoise' },
          { color: 'cyan' },
          { color: 'green' },
          { color: 'lime' },
          { color: 'chartreuse' },
          { color: 'olive' },
          { color: 'yellow' },
          { color: 'gold' },
          { color: 'orange' },
          { color: 'brown' },
          { color: 'red' },
          { color: 'maroon' },
          { color: 'pink' },
          { color: 'magenta' },
          { color: 'purple' },
          { color: 'indigo' },
          { color: 'violet' },
          { color: 'plum' }
        ]}
      />
    </Section>
    <Section title={<Text>Sidebar Widget Color</Text>}>
      <ColorSelect
        settingsKey="sidebarWidgetColor"
        colors={[
          { color: 'white' },
          { color: 'silver' },
          { color: 'grey' },
          { color: 'black' },
          { color: 'navy' },
          { color: 'blue' },
          { color: 'turquoise' },
          { color: 'cyan' },
          { color: 'green' },
          { color: 'lime' },
          { color: 'chartreuse' },
          { color: 'olive' },
          { color: 'yellow' },
          { color: 'gold' },
          { color: 'orange' },
          { color: 'brown' },
          { color: 'red' },
          { color: 'maroon' },
          { color: 'pink' },
          { color: 'magenta' },
          { color: 'purple' },
          { color: 'indigo' },
          { color: 'violet' },
          { color: 'plum' }
        ]}
      />
    </Section>

    <Section title={<Text>FAQ</Text>}>
      <Text bold>Q: How often do steps/heart rate/floors/etc. update?</Text>
      <Text>
        A: Steps, heart rate, floors, and battery level all update every minute
        along with the time. Weather is updated every half an hour. A future
        update will allow setting these individually but right now they are only
        updated every minute to save battery.
      </Text>
      <Text bold>
        Q: When the watch starts it doesn&apos;t have the colors I chose, but
        then it switches to them... what&apos;s up with that!
      </Text>
      <Text>
        A: The settings you choose are stored on your phone, and not on the
        watch itself. Because of this, when the watch starts it has to ask the
        phone for all of the settings. Once it gets them, it can change to your
        chosen colors.
      </Text>
      <Text bold>Q: I only see a &quot;--&quot; for my weather!</Text>
      <Text>
        A: This is most likely because you didn&apos;t enter a valid
        &quot;Postal Code&quot; in the settings for
        the watchface. It&apos;s also possible that weatherapi, which is
        used to fetch the weather, is not responding. Sometimes the clockface
        needs to be restarted; the quickest way to do this is to swipe up to see
        your steps for the day then go back to the clockface. This should
        trigger another fetch of the weather.
      </Text>
      <Text bold>Q: I want more colors to choose from!</Text>
      <Text>
        A: If you want more colors, feel free to email me at nate@moore.codes
        and I&apos;ll try and add them!
      </Text>
      <Text bold>Q: I want this on my Fitbit Ionic!</Text>
      <Text>
        A: This watchface is currently only available on the Versa; if I have
        enough time in the future I&apos;ll also make it work on the Ionic.
      </Text>
      <Text bold>Q: How did you make this?</Text>
      <Text>
        A: Source code for this watchface is available on Github at{' '}
        <Link source="https://github.com/TranquilMarmot/StyleTime">
          https://github.com/TranquilMarmot/StyleTime
        </Link>{' '}
        under the MIT license (which means feel free to use it as long as you
        give me credit!) Pull requests are welcome!
      </Text>
      <Text bold>Q: I found a bug/something is wrong!</Text>
      <Text>
        A: Please open an issue at{' '}
        <Link source="https://github.com/TranquilMarmot/StyleTime/issues">
          https://github.com/TranquilMarmot/StyleTime/issues
        </Link>{' '}
        or send me an email at nate@moore.codes
      </Text>
      <Text bold>
        Q: I really like this watchface and want to give you money!
      </Text>
      <Text>
        A: Aw, shucks. Find me as{' '}
        <Link source="https://venmo.com/TranquilMarmot">
          TranquilMarmot on Venmo
        </Link>{' '}
        if you really want to.
      </Text>
    </Section>
  </Page>
));
