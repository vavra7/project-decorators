import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  secondary: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Primary',
  disabled: true
};
