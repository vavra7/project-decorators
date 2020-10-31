import { Meta, Story } from '@storybook/react/types-6-0';
import { Input, InputProps } from './Input';

export default {
  title: 'inputs and controls/Input',
  component: Input
} as Meta;

const Template: Story<InputProps> = args => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
  label: 'Label'
};

export const Number = Template.bind({});
Number.args = {
  ...Text.args,
  type: 'number'
};
