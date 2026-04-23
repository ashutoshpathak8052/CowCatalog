import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { createCow } from '../services/cowService';
import { SEXES, PENS, STATUSES } from '../utils/constants';
import { colors, fontSizes, fontWeights, spacing, radii } from '../utils/theme';
import FormField from '../components/FormField';
import ChipPicker from '../components/ChipPicker';

const ALERT_TITLE = 'Error';
const SAVE_LABEL = 'Save Cow';
const DEFAULT_STATUS = 'Active';

const AddCowScreen = ({ navigation }) => {
  const [form, setForm] = useState({ earTag: '', sex: '', pen: '', status: DEFAULT_STATUS, weight: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.earTag.trim()) e.earTag = 'Ear tag is required';
    if (!form.sex) e.sex = 'Sex is required';
    if (!form.pen) e.pen = 'Pen is required';
    if (form.weight && (isNaN(form.weight) || parseFloat(form.weight) <= 0))
      e.weight = 'Weight must be a positive number';
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    try {
      await createCow(form);
      navigation.goBack();
    } catch (err) {
      Alert.alert(ALERT_TITLE, err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <FormField
        label="Ear Tag *"
        placeholder="e.g. ET-006"
        value={form.earTag}
        onChangeText={v => set('earTag', v)}
        error={errors.earTag}
        autoCapitalize="characters"
      />

      <ChipPicker label="Sex *" options={SEXES} value={form.sex} onChange={v => set('sex', v)} />
      {errors.sex ? <Text style={styles.chipError}>{errors.sex}</Text> : null}

      <ChipPicker label="Pen *" options={PENS} value={form.pen} onChange={v => set('pen', v)} />
      {errors.pen ? <Text style={styles.chipError}>{errors.pen}</Text> : null}

      <ChipPicker
        label="Status"
        options={STATUSES}
        value={form.status}
        onChange={v => set('status', v || DEFAULT_STATUS)}
      />

      <FormField
        label="Weight (kg) — optional"
        placeholder="e.g. 520"
        value={form.weight}
        onChangeText={v => set('weight', v)}
        error={errors.weight}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
        disabled={saving}
        activeOpacity={0.8}>
        {saving
          ? <ActivityIndicator color={colors.surface} />
          : <Text style={styles.saveBtnText}>{SAVE_LABEL}</Text>
        }
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.huge,
  },
  chipError: {
    color: colors.errorDark,
    fontSize: fontSizes.sm,
    marginTop: -(spacing.sm),
    marginBottom: spacing.sm + 2,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg - 2,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  saveBtnText: {
    color: colors.surface,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
  },
});

export default AddCowScreen;
